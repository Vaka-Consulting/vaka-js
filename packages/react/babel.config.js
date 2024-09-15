module.exports = {
  ...require('@vaka-tech/babel-config-base'),
  plugins: [
    ['babel-plugin-direct-import', { modules: ['@mui/system', '@mui/material', '@mui/icons-material', '@mui/lab'] }],
  ],
}
