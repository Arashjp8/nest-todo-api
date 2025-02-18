import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import * as path from "path";
import { Todo } from "src/todo/entities/todo.entity";

@Injectable()
export class DbService {
    private readonly dbFilePath: string;

    constructor() {
        this.dbFilePath = path.join(__dirname, "../../src/db/db.json");
    }

    async writeDataToDb(data: Todo[]): Promise<void> {
        try {
            await fs.writeFile(this.dbFilePath, JSON.stringify(data, null, 2));
            console.log("Data replaced in db.json");
        } catch (err) {
            console.error("Error writing data to db.json:", err);
        }
    }

    async readDataFromDb(): Promise<Todo[]> {
        const data = await fs.readFile(this.dbFilePath, "utf-8");
        const parsedData = JSON.parse(data);

        return parsedData;
    }
}
