// TODO: import module bila dibutuhkan di sini
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
  file1 = val;
};
let modifyFile2 = (val) => {
  file2 = val;
};
let modifyFile3 = (val) => {
  file3 = val;
};

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3

const getExpectedWord = (words) => {
  const splittedWord = words.split(' ');

  if (splittedWord?.length >= 1) {
    return splittedWord[1]
  };
};

const processData = (dataSet) => {
  const data = JSON.parse(dataSet);
  let expectedString = '';

  // case object
  if (data?.message !== undefined) {
    expectedString = data?.message;
  };

  // case array
  if (data?.length) {
    data?.forEach(item => {
      if (item?.message !== undefined) {
        expectedString = item?.message;
      };

      if (item?.data?.message !== undefined) {
        expectedString = item?.data?.message;
      }
    });
  };

  return getExpectedWord(expectedString);
};

const bacaData = (fnCallback) => {
  const fileList = [file1, file2, file3];
  const result = [];

  fileList.forEach(item => {
      const processItem = new Promise((resolve, reject) => {
        fs.readFile(item, (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          const getProcessedItem = processData(data);
          resolve(getProcessedItem);
        });
      });

      result.push(processItem);
  });

  // call result
  Promise.all(result).then(values => {
    fnCallback(null, values)
  }).catch(error => {
    fnCallback(error, null);
  });
};

// ! JANGAN DIMODIFIKASI
module.exports = {
  modifyFile1,
  modifyFile2,
  modifyFile3,
  bacaData,
};
