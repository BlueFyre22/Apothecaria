

const Array1 = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]


const mappedArray = Array1.map((subArray, index) => {
  return { alphabet: String.fromCharCode(65 + index), subArray: subArray }
})

console.log(mappedArray)