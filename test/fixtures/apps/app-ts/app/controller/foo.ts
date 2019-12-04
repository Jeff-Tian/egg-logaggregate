import { Controller } from "egg";

declare module "egg" {
  interface IController {
    foo: FooController;
  }
}

export default class FooController extends Controller {
  async getBar() {
    this.ctx.logger.info("bar info");
    this.ctx.logger.error(new Error("bar error"));
    this.ctx.logger.info("event is ", "bar");

    this.ctx.stauts = 200;
    this.ctx.body = "bar";
  }

  async throwBar() {
    this.ctx.logger.info("before throw ");
    this.ctx.throw(400);
    this.ctx.logger.info("after throw");
  }
}
