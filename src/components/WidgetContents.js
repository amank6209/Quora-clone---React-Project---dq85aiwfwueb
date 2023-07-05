import React from "react";

function WidgetContents() {
  return (
    <div className="widget-contents">
      <div className="widget-cont">
        {/* <img src="https://th.bing.com/th/id/R.f65be0a19046394a386913361729137c?rik=b1ahBVSf5QhfVQ&riu=http%3a%2f%2fwww.miraclestudios.in%2fblog%2fwp-content%2fuploads%2f2014%2f08%2fandroid-app-developer-Specialist11.jpg&ehk=s8QnyhIYBKQTIXimWdirEMWgiaKLjW%2fX4n5bPXsNSw0%3d&risl=&pid=ImgRaw&r=0" alt="" /> */}
        <div className="widget-content-title">
          <h5>Mobile App Programmer</h5>
          <p>The Best Mobile App Development Company</p>
        </div>
      </div>

      <div className="widget-content">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-ti-1574818-100-mzdwostcualpwcxekyrvyqqpychetdoc.jpeg"
          alt=""
        />
        <div className="widget-contentTitle">
          <h5>Quota of Quotes</h5>
          <p>Daily dosage of unforgettable lines from ...</p>
        </div>
      </div>
      <div className="widget-content">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-ti-1644613-100-ydflucgoeztbhwyurtmlqqrgfqmjmhpl.jpeg"
          alt=""
        />
        <div className="widget-contentTitle">
          <h5>Art & Artist</h5>
          <p>A Space retated to creating, practicing an...</p>
        </div>
      </div>

    </div>
  );
}

export default WidgetContents;