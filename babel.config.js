module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // 新的class语法
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
  ],
};
