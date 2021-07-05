import fs from "fs";

const doesConfigFileExist = () => {
  return <boolean>fs.existsSync("./.config.json");
};

export default doesConfigFileExist;
