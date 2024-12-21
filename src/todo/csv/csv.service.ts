import { Injectable } from "@nestjs/common";
import * as csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class CsvService {
  async ensureFileExists(filePath: string, headers: string[]): Promise<void> {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: headers.map((key) => ({ id: key, title: key })),
      });

      await csvWriter.writeRecords([]);
    }
  }

  async readCsv(filePath: string): Promise<any[]> {
    const results: any[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
  }

  async writeCsv(filePath: string, data: any[]): Promise<void> {
    console.info("writing into CSV file");

    if (data.length === 0) {
      throw new Error("Cannot write empty data to CSV");
    }

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(data);
  }
}
