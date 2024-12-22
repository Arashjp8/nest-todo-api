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

  async writeDataToDb(data: Todo[] | Todo): Promise<void> {
    try {
      try {
        await fs.access(this.dbFilePath);
      } catch {
        await fs.writeFile(this.dbFilePath, JSON.stringify(data, null, 2));
        console.log("File created and data written");
        return;
      }

      const currentData = await fs.readFile(this.dbFilePath, "utf-8");
      const parsedData = JSON.parse(currentData);

      const dataToWrite = Array.isArray(data) ? data : [data];

      const updatedData = Array.isArray(parsedData)
        ? [...parsedData, ...dataToWrite]
        : [...dataToWrite];

      await fs.writeFile(this.dbFilePath, JSON.stringify(updatedData, null, 2));
      console.log("Data updated in db.json");
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
