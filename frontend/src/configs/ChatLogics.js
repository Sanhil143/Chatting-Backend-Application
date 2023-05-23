export const getSender = (loggedUser,users) => {
     
      if(users[0]._id === loggedUser.data._id){
            return users[1].name
      }
      else if(users[1]._id === loggedUser.data._id){
            return users[0].name
      }

      }
