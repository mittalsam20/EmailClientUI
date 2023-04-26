# EmailClientUI (Assignment for Roc8)
 - A basic EmailClient UI, where user can see their read, unread and favorited emails.
 - deploy link:- https://samakshemailclient.netlify.app/
 
 ### Features 
  - [x] filter by Status (All, Read, UnRead, Favorite)
  - [x] open selected Email in a master slave manner
  - [x] persist favorited and read emails in localStorage
  - [x] pagination by selecting pageNumber
  - [x] mark email as favorite and also unMark them
  
 ### Folder Structure
 - AppComponents have smart components
 - UIComponents have dumb components.
 - Hocs have withLoader and withAxios
   - withAxios takes url and header as props and returns {data, error, isLoading}
   - withLoader takes a prop isLoading and on the basis of that renders the wrapped component
   
  
