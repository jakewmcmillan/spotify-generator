//cloudinary handlers
const locationWidget = cloudinary.createUploadWidget(
    {
      cloudName: "daheygjio",
      uploadPreset: "travelblogger",
      sources: ["local", "url", "google_drive", "facebook", "instagram"],
      showAdvancedOptions: false,
      clientAllowedFormats: "image",
      cropping: false,
      multiple: false,
      //thumbnails: '.thumbnail',
      defaultSource: "local",
      maxImageFileSize: 2000000, //restrict file size to less than 2MB
      maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      styles: {
        palette: {
          window: "#CAD2C5",
          sourceBg: "#EDEDE4",
          windowBorder: "#84A98C",
          tabIcon: "#354F52",
          inactiveTabIcon: "#52796F",
          menuIcons: "#354F52",
          link: "#84A98C",
          action: "#2F3E46",
          inProgress: "#354F52",
          complete: "#84A98C",
          error: "#c43737",
          textDark: "#2F3E46",
          textLight: "#FFFFFF"
        },
        fonts: {
          default: null,
          "'Fauna One', sans-serif": {
            url:
              "https://fonts.googleapis.com/css2?family=Fauna+One&display=swap",
            active: true
          }
        }
      }
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        document
          .getElementById("uploaded-img")
          .setAttribute("src", result.info.secure_url);
      }
    }
  );
  
  document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
      locationWidget.open();
    },
    false
  );

  const profileWidget = cloudinary.createUploadWidget(
    {
      cloudName: "daheygjio",
      uploadPreset: "profilepics",
      sources: ["local", "url", "google_drive", "facebook", "instagram"],
      showAdvancedOptions: false,
      clientAllowedFormats: "image",
      cropping: false,
      multiple: false,
      //thumbnails: '.thumbnail',
      defaultSource: "local",
      maxImageFileSize: 2000000, //restrict file size to less than 2MB
      maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      styles: {
        palette: {
          window: "#CAD2C5",
          sourceBg: "#EDEDE4",
          windowBorder: "#84A98C",
          tabIcon: "#354F52",
          inactiveTabIcon: "#52796F",
          menuIcons: "#354F52",
          link: "#84A98C",
          action: "#2F3E46",
          inProgress: "#354F52",
          complete: "#84A98C",
          error: "#c43737",
          textDark: "#2F3E46",
          textLight: "#FFFFFF"
        },
        fonts: {
          default: null,
          "'Fauna One', sans-serif": {
            url:
              "https://fonts.googleapis.com/css2?family=Fauna+One&display=swap",
            active: true
          }
        }
      }
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        document.querySelector('.avatar')
          .setAttribute("src", result.info.secure_url);
      }
    }
  );

  /*document.getElementById("profilewidget").addEventListener(
    "click",
    function () {
      profileWidget.open();
    },
    false
  );*/

//modal handlers

// Declare variables of Modal
const openModalBtn = document.getElementById("open-modal");
const modalOverlay = document.getElementById("modal-overlay");

// Show modal 
const showModalWindow = () => {
  modalOverlay.style.display = 'flex';
}
openModalBtn.addEventListener("click", showModalWindow);

// Hide Modal
const closeModalButton = document.getElementById("close-modal");

const hideModalWindow = () => {
    modalOverlay.style.display = 'none';
    const destinationEl = document.getElementById('dname');
    const addressEl = document.getElementById('address');
    const descriptionEl = document.getElementById('description');
    //clear form values
    destinationEl.value='';
    addressEl.value ='';
    descriptionEl.value='';
    document.getElementById('uploaded-img').setAttribute('src','data:,')
}

closeModalButton.addEventListener("click", hideModalWindow);


// Hide modal when anything outside the modal is clicked

const hideModal = (e) => {

    if(e.target === e.currentTarget) {
      console.log(e.target === e.currentTarget)
        hideModalWindow();
    }
}

//submit form
const form = document.getElementById('post');
const submitModal = async (e) => {
  e.preventDefault();
  const title = document.getElementById('dname').value.trim();
  const address = document.getElementById('address').value.trim();
  const description = document.getElementById('description').value.trim();
  const imgurl = document.getElementById('uploaded-img').getAttribute('src');
  
  //send request
  if (title && address && description && imgurl) {
    const payload = {
        title:title,
        address:address,
        image_url:imgurl,
        content: description}
    console.log(payload)
    const response = await fetch('/api/destinations/post', { //is this the right route? someone check
      method: 'POST',
      body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        alert('Post Added!')
      } else {
        alert('Failed to add to add post!');
      }
}

  hideModalWindow();
}
form.addEventListener("submit", (e) => submitModal(e))

modalOverlay.addEventListener("click", hideModal);