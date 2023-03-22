import React from "react";

import imageCompression from "browser-image-compression";

import Card from "react-bootstrap/Card";
import "./ImageCompressor.css";

export default class imageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    };
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div className="Container">
        <div className="Steps">
          <h1 className="head"><u>IMAGE COMPRESSING APP</u></h1>
          <h1><strong>Three Simple Steps</strong></h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>

        <div className="Main_button">
          <div className="Upload">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src=""
              ></Card.Img>
            )}
            <div className="file">
              <input
                type="file"
                accept="image/*"
                class="input"
                onChange={e => this.handle(e)}
              />
            </div>
          </div>
          <div className="compress">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className="btn"
                onClick={e => this.click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="card_image">
            <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="download">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="download_a"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}