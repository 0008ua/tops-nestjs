import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './dto/file.response';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';
@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileResponse[]> {
    const res: FileResponse[] = [];
    const dateFolder = format(new Date(), 'yyyy-mm-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      res.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname });
    }
    return res;
  }

  async convertToWebp(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
