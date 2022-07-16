import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { decode } from 'base64-arraybuffer';

export default async function handler(req, res) {
  // POST requests only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `HTTP method ${req.method} is not allowed` });
    return;
  }

  // Create new image
  let { image } = req.body;

  if (!image) {
    return res.status(500).json({ message: 'No image provided' });
  }

  try {
    const contentType = image.match(/data:(.*);base64/)?.[1];
    const base64FileData = image.split('base64,')?.[1];
    if (!contentType || !base64FileData) {
      return res.status(500).json({ message: 'Invalid image format' });
    }
    const fileName = nanoid();
    const ext = contentType.split('/')[1];
    const path = `${fileName}.${ext}`;

    const { data, error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(path, decode(base64FileData), {
        contentType,
        upsert: true,
      });
    if (uploadError) {
      throw new Error('Unable to upload image to storage');
    }
    const url = `${process.env.SUPABASE_URL.replace(
      '.co',
      '.in'
    )}/storage/v1/object/public/${data.Key}`;
    return res.status(200).json({ url });
  } catch (e) {
    // res.status(500).json({ message: 'Something went wrong' });
    res.status(500).json(e);
  }
}
