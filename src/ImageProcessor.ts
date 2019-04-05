import { EventEmitter } from "events";
import { removeBackgroundFromImageFile, RemoveBgFileOptions } from "remove.bg";

interface ImageTask {
  source: string;
  output: string;
  apiKey: string;
}

function eventNameFor(imageData: ImageTask): string {
  return `${imageData.source}-to-${imageData.output}`;
}

export default class ImageProcessor {
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  public processImage(imageTask: ImageTask) {
    const eventName = eventNameFor(imageTask);
    if (this.hasEvent(eventName)) {
      return Promise.reject(new Error("Image is already processing"));
    }

    return new Promise((resolve, reject) => {
      this.eventEmitter.once(eventName, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });

      removeBackgroundFromImageFile(this.taskToRemoveBgData(imageTask))
        .then(() => {
          this.eventEmitter.emit(eventName, null);
        })
        .catch(error => {
          this.eventEmitter.emit(eventName, error);
        });
    });
  }

  private hasEvent(eventName: string): boolean {
    return this.eventEmitter.eventNames().includes(eventName);
  }

  private taskToRemoveBgData(imageTask: ImageTask): RemoveBgFileOptions {
    return {
      path: imageTask.source,
      outputFile: imageTask.output,
      apiKey: imageTask.apiKey,
      size: "regular",
      type: "auto"
    };
  }
}
