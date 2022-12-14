const capitalizeEachWord = (str: string) => {
  // Capitalize each word
  const nameArr = str.split('-');
  const newNameArr = nameArr.map(
    (word: string) => word[0].toUpperCase() + word.substring(1)
  );
  const formattedName = newNameArr.join(' ');

  return formattedName;
};

export default capitalizeEachWord;
