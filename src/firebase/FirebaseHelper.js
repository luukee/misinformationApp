//================================ React Native Imported Files ======================================//

import React from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";

//================================ Local Imported Files ====================================== //

class firebaseServices {
  constructor(props) {}

  // ---------------------------- Authentication ----------------------------//

  checkEmailAlreadyExists(email, callback) {
    auth()
      .fetchSignInMethodsForEmail(email)
      .then((auth_res) => {
        if (auth_res.length == 0) {
          callback({
            isSuccess: true,
            response: auth_res,
            message: "Email is valid",
          });
        } else {
          callback({
            isSuccess: false,
            response: auth_res,
            message: "This email has already been taken.",
          });
        }
      });
  }

  signUpWith(email, password, callback) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        callback({
          isSuccess: true,
          response: user.user,
          message: "user logged in successfully.",
        }); // user.user;
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error.message });
      });
  }

  loginWithEmailPass(email, password, callback) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        callback({
          isSuccess: true,
          response: user.user,
          message: "user logged in successfully.",
        }); // user.user;
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error.message });
      });
  }

  resetPassword(email, callback) {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        callback({
          isSuccess: true,
          response: [],
          message: "We have sent a password reset link to your email",
        });
      })
      .catch((error) => {
        callback({
          isSuccess: true,
          response: [],
          message: error.message,
        });
      });
  }

  resetEmail(email, callback) {
    auth()
      .currentUser.updateEmail(email)
      .then(() => {
        callback({
          isSuccess: true,
          response: [],
          message: "Email successfully updated.",
        });
      })
      .catch((e) => {
        callback({
          isSuccess: false,
          response: [],
          message: e.message,
        });
      });
  }

  // ---------------------------- Collection CURD ---------------------------- //

  fetchAllRecordsOfCollection = (collectionName, callback) => {
    firestore()
      .collection(collectionName)
      .get()
      .then((response) => {
        callback({
          isSuccess: true,
          response: response._docs,
          message: "Documents fetched successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error.message });
      });
  };

  fetchARecordFromCollection = (collectionName, documentId, callback) => {
    try {
      firestore()
        .collection(collectionName)
        .doc(documentId)
        .get()
        .then((snapshot) => {
          if (snapshot._data) {
            callback({
              isSuccess: true,
              response: snapshot,
              message: "Document fetched successfully",
            });
          } else {
            callback({
              isSuccess: false,
              response: null,
              message: "Document Not found",
            });
          }
        })
        .catch((error) => {
          callback({ isSuccess: false, response: null, message: error });
        });
    } catch (e) {
      callback({
        isSuccess: false,
        response: null,
        message: "Document not found",
      });
    }
  };

  fetchDocumentsFromCollection = (collectionName, arrayFilters, callback) => {
    let fireStoreCollection = firestore().collection(collectionName);
    arrayFilters.map((filter) => {
      let key = filter.key;
      let operator = filter.operator;
      let value = filter.value;
      fireStoreCollection = fireStoreCollection.where(key, operator, value);
    });
    fireStoreCollection
      .get()
      .then((snapshot) => {
        if (snapshot._docs.length > 0) {
          callback({
            isSuccess: true,
            response: snapshot._docs,
            message: "Document fetched successfully",
          });
        } else {
          callback({
            isSuccess: true,
            response: [],
            message: "Document fetched successfully",
          });
        }
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  createADocumentForCollection = (
    collectionName,
    documentId,
    documentData,
    callback
  ) => {
    let fireStoreCollection = firestore().collection(collectionName);
    if (documentId.length > 0) {
      fireStoreCollection = fireStoreCollection.doc(documentId);
    }
    fireStoreCollection
      .set(documentData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: "Document successfully successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  createNewDocumentForCollection = (collectionName, documentData, callback) => {
    let fireStoreCollection = firestore().collection(collectionName);

    fireStoreCollection
      .add(documentData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: "Document successfully successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  updateDocumentOfCollection = (
    collectionName,
    documentId,
    documentData,
    callback
  ) => {
    firestore()
      .collection(collectionName)
      .doc(documentId)
      .update(documentData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: "Document successfully successfully",
        });
      })
      .catch((error) => {
        callback({ isSuccess: false, response: null, message: error });
      });
  };

  uploadImage(imageUri, imageName, callback) {
    const image =
      Platform.OS === "android" ? imageUri : imageUri.replace("file:///", ""); //imagePath.uri;

    const imageRef = storage().ref(`${imageName}.png`);
    imageRef
      .putFile(image)
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        callback({
          isSuccess: true,
          response: url,
          message: "Image uploaded successfully",
        });
        return url;
      })
      .catch((error) => {
        alert(error.message);
        callback({
          isSuccess: false,
          response: null,
          message: error.message,
        });
        return null;
      });
  }
}

const apiService = new firebaseServices();

export default apiService;
