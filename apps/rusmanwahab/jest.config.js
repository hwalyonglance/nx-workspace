module.exports = {
  name: "rusmanwahab",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/rusmanwahab/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
