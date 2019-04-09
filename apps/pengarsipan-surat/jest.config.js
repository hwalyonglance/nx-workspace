module.exports = {
  name: 'pengarsipan-surat',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pengarsipan-surat/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
