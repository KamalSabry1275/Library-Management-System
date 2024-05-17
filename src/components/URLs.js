export const routes = {
  Home: "/",
  Login: "/login",
  Register: "/register",
  Resetpassword: "/Resetpassword",
  ActiveEmail: "/activeemail",
  Users: "/users",
  Admin: {
    AllUsers: "/admin/all",
    AddUser: "/admin/add",
    EditUser: "/admin/edit/:id",
    ShowUser: "/admin/user/:id",
    Filtering: "/admin/filter",
  },
  Librarian: {
    User: {
      All: "librarian/user/all",
    },
    Genre: {
      Add: "librarian/genre/add",
      All: "librarian/genre/all",
    },
    Book: {
      Add: "librarian/addbook",
      Filter: "librarian/filterbook",
    },
    Transaction: {
      "/": "librarian/transaction/",
      Borrow: "borrow",
      Reserve: "reserve",
      Return: "return",
    },
  },
};

const port = "6786";
const DOMIN = `5.181.177.3:${port}`;

export const apis = {
  Admin: {
    AllUsers: `http://${DOMIN}/api/v1/user/admin/allUsers?page=:number`,
    AddUser: `http://${DOMIN}/api/v1/user/admin/addUser`,
    Edit: `http://${DOMIN}/api/v1/user/admin/edit`,
    Delete: `http://${DOMIN}/api/v1/user/admin/delete`,
    IsActive: `http://${DOMIN}/api/v1/user/admin/isActive`,
    Filter: `http://${DOMIN}/api/v1/user/admin/filter?page=:number&`,
    GetLibrarian: `http://${DOMIN}/api/v1/user/admin/getLibrarian`,
  },
  Librarian: {
    User: {
      AllUsers: `http://${DOMIN}/api/v1/user/librarian/allUsers?page=:number`,
      ToggleUserActive: `http://${DOMIN}/api/v1/user/librarian/toggle-user-active`,
    },
    Genre: {
      All: `http://${DOMIN}/api/v1/genre/all`,
      Add: `http://${DOMIN}/api/v1/genre/add`,
      Delete: `http://${DOMIN}/api/v1/genre/delete/:id`,
    },
    Book: {
      Add: `http://${DOMIN}/api/v1/book/add`,
      Update: `http://${DOMIN}/api/v1/book/update/:id`,
      Delete: `http://${DOMIN}/api/v1/book/delete/:id`,
      Filter: `http://${DOMIN}/api/v1/book/librarian/filter?page=:number&`,
      Transaction: {
        //states => Borrow_request - Returned - Borrowed
        FilterByState: `http://${DOMIN}/api/v1/book/librarian/requestedBooks?page=:number&state=:state`,
        Borrow: {
          Confirm: `http://${DOMIN}/api/v1/book/librarian/confirmBorrow?transactionId=:id`,
          Delete: `http://${DOMIN}/api/v1/book/librarian/deleteTransaction?transactionId=:id`,
        },
        Reserve: {
          Confirm: `http://${DOMIN}/api/v1/book/librarian/confirmReserve?reservationId=:id`,
          Delete: `http://${DOMIN}/api/v1/book/librarian/deleteReservation?reservationId=:id`,
          //status => Pending - Confirmed - Expired
          FilterByStatus: `http://${DOMIN}/api/v1/book/librarian/reservedBooks?page=:number&status=:status`,
        },
        Return: {
          Confirm: `http://${DOMIN}/api/v1/book/librarian/confirmReturn?transactionId=:id`,
          Delete: `http://${DOMIN}/api/v1/book/librarian/deleteTransaction?transactionId=:id`,
        },
      },
    },
  },

  Register: `http://${DOMIN}/api/v1/user/register`,
  Login: `http://${DOMIN}/api/v1/user/login`,
  Logout: `http://${DOMIN}/api/v1/user/logout`,
  ResetPassword: `http://${DOMIN}/api/v1/user/reset-password`,
  ForgetPassword: `http://${DOMIN}/api/v1/user/forget-password`,
  VerifyEmail: `http://${DOMIN}/api/v1/user/verify-email`,
  SendEmailVerify: `http://${DOMIN}/api/v1/user/sendEmail-verify`,
  RefreshToken: `http://${DOMIN}/api/v1/user/refresh-token`,
};
