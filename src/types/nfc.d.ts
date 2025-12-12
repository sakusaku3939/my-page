// Web NFC API type definitions
declare global {
  interface Window {
    NDEFReader: any;
  }

  interface NDEFMessage {
    records: NDEFRecord[];
  }

  interface NDEFRecord {
    recordType: string;
    mediaType?: string;
    id?: string;
    data?: BufferSource;
    encoding?: string;
    lang?: string;
  }

  interface NDEFReadingEvent extends Event {
    serialNumber: string;
    message: NDEFMessage;
  }

  interface NDEFWriteOptions {
    overwrite?: boolean;
    signal?: AbortSignal;
  }

  class NDEFReader extends EventTarget {
    constructor();

    scan(options?: { signal?: AbortSignal }): Promise<void>;

    write(message: string | BufferSource | NDEFMessageInit, options?: NDEFWriteOptions): Promise<void>;

    addEventListener(type: "reading", listener: (event: NDEFReadingEvent) => void): void;
    addEventListener(type: "readingerror", listener: (event: Event) => void): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
  }

  interface NDEFMessageInit {
    records: NDEFRecordInit[];
  }

  interface NDEFRecordInit {
    recordType: string;
    mediaType?: string;
    id?: string;
    encoding?: string;
    lang?: string;
    data?: any;
  }
}

export {};