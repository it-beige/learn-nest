export class AaaException {
  constructor(public aaa: string, public bbb: string) {}

  getStatus() {
    return 500;
  }
}
