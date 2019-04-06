module.exports = {
  name: 'toko-buku',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/toko-buku/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
