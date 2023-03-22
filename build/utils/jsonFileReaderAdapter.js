var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises as fs } from "fs";
class JsonFileReaderAdapter {
    readData(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!filePath ||
                    typeof filePath !== "string" ||
                    filePath.trim().length === 0) {
                    throw new Error(`Invalid filePath: ${filePath}`);
                }
                const fileData = yield fs.readFile(filePath, "utf-8");
                return JSON.parse(fileData);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Error reading file ${filePath}: ${err.message}`);
                }
                throw err;
            }
        });
    }
}
export const dataReader = new JsonFileReaderAdapter();
