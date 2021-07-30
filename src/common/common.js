

export const getUserIndexByPseudo = (usersDatas, pseudo) => {
  return usersDatas.findIndex(user => user.pseudo === pseudo);
}

export const getColorFromTransfer = (transfer, usersDatas) => {
  const userIndex = getUserIndexByPseudo(usersDatas, transfer.user);

  if (userIndex === -1)
  {
    console.error("getColorFromTransfer: Invalid pseudo");
    return;
  }

  return (transfer.perso === "1") ? usersDatas[userIndex].colors.colorDark : usersDatas[userIndex].colors.colorDarkLight;
}

export const getMainColorFromPseudo = (pseudo, usersDatas) => {
  const userIndex = getUserIndexByPseudo(usersDatas, pseudo);

  if (userIndex === -1)
  {
    console.error("getMainColorFromPseudo: Invalid pseudo");
    return;
  }

  return usersDatas[userIndex].colors.color;
}

export const getOccurencesInArray = (index, array) => 
{
  const value = array[index];
  let occurenceIndex;

  let count = 0;
  const occurences = array.reduce((a, v, i) => {
    if (v === value) {
      if (i === index) occurenceIndex = count;
      count+=1;
      return a + 1;
    }
    else {
      return a;
    }
  }, 0);

  return {count: occurences, index: occurenceIndex};
}