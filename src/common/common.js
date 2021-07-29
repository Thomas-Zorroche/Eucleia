

export const getUserIndexByPseudo = (usersDatas, pseudo) => {
  return usersDatas.findIndex(user => user.pseudo === pseudo);
}