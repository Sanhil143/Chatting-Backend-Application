// export const getSender = (loggedUser,users) => {
//       return users[0]._id === loggedUser.data._id ? users[1].name : users[0].name

//       }


export const getSender = (loggedUser, users) => {
      if (!users || users.length === 0) {
            return 'user Loading';
          }
    
      return users[0]._id === loggedUser.data._id ? users[1].name : users[0].name;
    };
    