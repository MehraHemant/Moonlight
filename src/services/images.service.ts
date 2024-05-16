import { ImageType } from "@/types";
import { RowDataPacket } from "mysql2";
import path from 'path';
import {dbExecute, dbQuery} from "@/db";

const uploadDir = path.join(process.cwd(), "public", "custom-uploads");

export class ImagesService {
    static getImages =  async () => {
        let command = dbExecute(`SELECT id, name FROM image`);
        const [rows, _] = await command
        return mapDBResultToImage(rows as RowDataPacket[])
    }

    static serveFile = async (fileId: string): Promise<[Buffer, string]> => {
        let command = dbExecute(`SELECT id, name, data FROM image WHERE id=?`, [fileId]);
        const [rows, _] = await command;
        if(rows.length===0 || !rows[0].data){
            throw new Error("Image Not Found");
        }
        let contentType: string;
        const extension = path.extname(rows[0].name);
        console.info("The extension is", extension);
          switch(extension){
            case '.jpeg':
                contentType = 'image/jpeg'
            break;
            case '.jpg':
                contentType = 'image/jpg'
            break;
            case '.gif':
                contentType = 'image/gif'
            break;
            case '.png':
                contentType = 'image/png'
            break;
            default:
            throw new Error("Only images should be requested")
        }
        return [rows[0].data, contentType];
    }

    static getImageById =  async (id: string) => {
        let command = dbExecute(`SELECT id, name FROM image WHERE id=?`, [id]);
        const [rows, _] = await command
        return mapDBResultToImage(rows as RowDataPacket[])
    }
    
    static storeImages = async (files: Blob[]) => {
        const uploadedFileData = [];
        for(let file of files){
          const buffer = Buffer.from(await file.arrayBuffer());
          uploadedFileData.push({name:file.name, buffer: buffer})
        } 
            const imagesDataToStore = uploadedFileData.map(({name, buffer}) => [name, buffer]);
            let command = dbQuery('INSERT INTO image (name, data) VALUES ?', [imagesDataToStore]);
            const [rows, _] = await command
            return true;
    }

    static deleteImageById = async (id: string): Promise<boolean> =>  {
        let command = dbExecute(`DELETE FROM image WHERE id= ?`, [id]);
        const [_rowsTemp, _fieldsTemp] = await command
        return true;
    }
}

const mapDBResultToImage = (rows: RowDataPacket[]): ImageType[]=>{
    return rows.map((r)=>({
        id: r["id"],
        name: r["name"],
    }));
} 
