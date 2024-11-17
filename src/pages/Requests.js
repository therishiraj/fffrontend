import React, { useState } from 'react';
import './Requests.css';

const Requests = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'MacBook Pro - 2020',
      description: 'A well-maintained MacBook Pro with a 256GB SSD and 16GB RAM.',
      isListed: false,
      requests: [
        {
          id: 1,
          name: 'Emma Lee',
          contact: 'emma@nitc.ac.in',
          message: 'Hi! Is the MacBook Pro still available?',
          status: 'Accepted',
        },
        {
          id: 2,
          name: 'John Doe',
          contact: 'john.doe@nitc.ac.in',
          message: 'Can you reduce the price by $100?',
          status: 'Pending',
        },
      ],
    },
    {
      id: 2,
      title: 'Backpack - North Face',
      description: 'A sturdy and spacious backpack suitable for hiking and daily use.',
      isListed: true,
      requests: [
        {
          id: 1,
          name: 'Sophia Patel',
          contact: 'sophia@nitc.ac.in',
          message: 'Is the backpack in good condition?',
          status: 'Pending',
        },
        {
          id: 2,
          name: 'Chris Johnson',
          contact: 'chris@nitc.ac.in',
          message: 'Can I pick it up tomorrow?',
          status: 'Pending',
        },
      ],
    },
  ]);

  const [activeListing, setActiveListing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState({}); // To store the listing and request IDs for the action

  const maskEmail = (email) => {
    const [local, domain] = email.split('@');
    return `${local.slice(0, 2)}*****@${domain}`;
  };

  const acceptRequest = (listingId, requestId) => {
    setModalMessage(
      'Accepting this request will temporarily delist the product. It will be marked as sold after 24 hours if not manually updated.'
    );
    setModalAction({ listingId, requestId });
    setShowModal(true);
  };

  const finalizeAccept = () => {
    const { listingId, requestId } = modalAction;

    const updatedListings = listings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            isListed: false,
            requests: listing.requests.map((request) =>
              request.id === requestId
                ? { ...request, status: 'Accepted' }
                : { ...request, status: 'Declined' }
            ),
          }
        : listing
    );

    setListings(updatedListings);
    setShowModal(false); // Close modal after finalizing
  };

  const declineRequest = (listingId, requestId) => {
    const updatedListings = listings.map((listing) =>
      listing.id === listingId
        ? {
            ...listing,
            requests: listing.requests.filter((request) => request.id !== requestId),
          }
        : listing
    );

    setListings(updatedListings);

    const updatedActiveListing = updatedListings.find((listing) => listing.id === listingId);
    setActiveListing(updatedActiveListing);
  };

  const relistProduct = (listingId) => {
    const updatedListings = listings.map((listing) =>
      listing.id === listingId ? { ...listing, isListed: true } : listing
    );
    setListings(updatedListings);

    setModalMessage('The product has been re-listed and is available for buyers again.');
    setShowModal(true);
  };

  return (
    <div className="requests-page">
      <aside className="sidebar">
        <h2>Your Listings</h2>
        <ul className="listing-list">
          {listings.map((listing) => (
            <li
              key={listing.id}
              className={`listing ${!listing.isListed ? 'unavailable' : ''}`}
              onClick={() => setActiveListing(listing)}
            >
              {listing.title}
            </li>
          ))}
        </ul>
      </aside>

      <section className="requests-area">
        {activeListing ? (
          <>
            <h2>Requests for {activeListing.title}</h2>
            <p className="listing-description">{activeListing.description}</p>
            <p className={`listing-status ${activeListing.isListed ? '' : 'delisted'}`}>
              {activeListing.isListed ? 'Available' : 'Currently Unavailable'}
            </p>
            <div className="requests-list">
              {activeListing.requests.length > 0 ? (
                activeListing.requests.map((request) => (
                  <div key={request.id} className="request">
                    <p><strong>Name:</strong> {request.name}</p>
                    <p>
                      <strong>Contact:</strong>{' '}
                      {request.status === 'Accepted' ? request.contact : maskEmail(request.contact)}
                    </p>
                    <p><strong>Message:</strong> {request.message}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <div className="actions">
                      {request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() =>
                              acceptRequest(activeListing.id, request.id)
                            }
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              declineRequest(activeListing.id, request.id)
                            }
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-requests">No pending requests</p>
              )}
            </div>
            {!activeListing.isListed && (
              <button
                className="relist-button"
                onClick={() => relistProduct(activeListing.id)}
              >
                Re-list Product
              </button>
            )}
          </>
        ) : (
          <p className="no-listing-selected">Select a listing to view requests</p>
        )}
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <div className="modal-actions">
              <button onClick={finalizeAccept}>Accept</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
