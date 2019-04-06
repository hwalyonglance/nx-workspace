module.exports = {
  name: 'pengolahan-nilai',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pengolahan-nilai/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
