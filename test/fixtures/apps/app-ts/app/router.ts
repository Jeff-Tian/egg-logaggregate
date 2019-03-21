import { Application } from "egg";

export default (app: Application) => {
  const controller = app.controller;

  app.get("foo.getBar", "/foo", controller.foo.getBar);
};
