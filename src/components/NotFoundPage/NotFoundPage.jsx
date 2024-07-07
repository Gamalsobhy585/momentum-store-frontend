import React from 'react';


export default function NotFoundPage() {
  return (
    <>
      <div className="not-found-container text-center d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
        <img src="404.jpg" alt="Not Found" className="not-found-image rounded-2 img-fluid" />
        <h1 className="mt-4">Page Not Found</h1>
        <p className="mt-2">Sorry, the page you are looking for does not exist.</p>
      </div>
    </>
  );
}
