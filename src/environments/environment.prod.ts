import gql from 'graphql-tag';
export const environment = {
  BASE_URL: 'http://routemytours.com:5000',
  API_URL: 'api/v1',
  production: true,
  login: gql`mutation  
  login($username : String!, $password : String!){
    login(username : $username, password : $password){
      id
      username
      firstname
      lastname
      photo
      token
      gender
      position
      position_id
      root{
        id
        name
        root
        color
      }
    }
  }`,
  createfolder: gql`mutation
    createFolder($name : String!,$folder_id : String!){
      createFolder(name:$name, folder_id : $folder_id){
        id
        name
        description
        path
        color
        created_at
      }
    }`,
    deletefolder: gql`mutation
    deleteFolder($folder_id : String!){
      deleteFolder(folder_id : $folder_id){
        success
        msg
      }
    }
  `,
  deletefile: gql`mutation
  deleteFile($file_id : String!){
    deleteFile(file_id : $file_id){
      success
      msg
    }
  }
`,
  datainfolder: gql`
    query dataInFolder($folder_id : ID!){
      dataInFolder(folder_id : $folder_id){
        files{
          id
          name
          path
          preview_path
        },
        folders{
          id
          name
          path
        }
      }
    }`,
  donwloadfile: gql`
    query downloadfile($id : ID!){
      downloadfile(id : $id){
        link
      }
    }
    `,
  users: gql`
    query users{
      users{
        id
        username
        firstname
        lastname
        email
        position
        position_id
      }
    }`,
  positions: gql`
    query positions{
      positions{
        id
        name
      }
    }`,
  addUser: gql`
    mutation addUser($username : String!,$password : String!,$firstname: String,$lastname : String, $email : String,$position_id : ID){
      addUser(username : $username,password : $password,firstname : $firstname,lastname : $lastname, email : $email,position_id : $position_id){
        id
        username
        firstname
        lastname
        email
        position
        position_id
      }
    }`,
  updateUser: gql`
    mutation updateUser($id : ID!,$password : String,$firstname: String,$lastname : String, $email : String,$position_id : ID){
      updateUser(id : $id,password : $password,firstname : $firstname,lastname : $lastname,email : $email, position_id : $position_id){
        id
        username
        firstname
        lastname
        email
        position
        position_id
      }
    }`,
};
