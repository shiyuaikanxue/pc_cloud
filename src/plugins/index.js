import { Button, Popup } from "vant";

const plugins = [Button, Popup];

export default function usePlugins(app) {
  plugins.map((item) => {
    return app.use(item);
  });
}
