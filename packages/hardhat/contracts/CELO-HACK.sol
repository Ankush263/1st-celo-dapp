// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    struct RescueDetails {
        uint rescueId;
        address rescuerAddress;
        string language;
        string name;
        uint numOfPeople;
        string ageGroup;
        string reason;
        string location;
        string phoneNo;
        bool rescuePickup;
        bool rescueRecieved;
        bool rescueClosed;
    }

    struct DonationDetails {
        uint donationId;
        address donarAddress;
        string language;
        string name;
        string location;
        string phoneNo;
        string pickupTime;
        string pickupDay;
        string foodItems;
        uint quantity;
        bool NFTreceived;
        bool donationPickup;
        bool donationReceived;
        bool donationClosed;
    }

    uint rescueCount = 0;
    uint donationCount = 0;

    RescueDetails[] public AllRescueDetails;
    DonationDetails[] public AllDonationDetails;

    Counters.Counter private _tokenIdCounter;
    address payable public owner;



    constructor() ERC721("MyToken", "MTK") {
        owner = payable(msg.sender);
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // -------------------------All Rescue Functions---------------------------------------------

    function SendRescueRequest
    (
        string memory _language, 
        string memory _name, 
        uint _numOfPeople, 
        string memory _ageGroup, 
        string memory _reason,
        string memory _location,
        string memory _phoneNo
    ) public {

        RescueDetails memory tempRescueDetails;

        tempRescueDetails.language = _language;
        tempRescueDetails.rescuerAddress = msg.sender;
        tempRescueDetails.rescueId = rescueCount;
        tempRescueDetails.name = _name;
        tempRescueDetails.numOfPeople = _numOfPeople;
        tempRescueDetails.ageGroup = _ageGroup;
        tempRescueDetails.reason = _reason;
        tempRescueDetails.location = _location;
        tempRescueDetails.phoneNo = _phoneNo;

        rescueCount++;

        AllRescueDetails.push(tempRescueDetails);
    }

    function getAllRescueRequest() public view returns(RescueDetails[] memory) {
        return AllRescueDetails;
    }

    function getRescuePickup(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");  // Here Id starts from (0 -> infinity)
        require(AllRescueDetails[_rescueId].rescueRecieved == false);
        require(AllRescueDetails[_rescueId].rescueClosed == false);

        AllRescueDetails[_rescueId].rescuePickup = true;
    }

    function getRescueRecieved(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllRescueDetails[_rescueId].rescuePickup == true);
        require(AllRescueDetails[_rescueId].rescueClosed == false);

        AllRescueDetails[_rescueId].rescueRecieved = true;
    }

    function getRescueClosed(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllRescueDetails[_rescueId].rescuePickup == true);
        require(AllRescueDetails[_rescueId].rescueRecieved == true);

        AllRescueDetails[_rescueId].rescueClosed = true;
    }

    function getAllMyRescueDetails() public view returns(RescueDetails[] memory) {
        uint totalRescueCount = rescueCount;
        uint rescue = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalRescueCount; i++) {
            if(AllRescueDetails[i].rescuerAddress == msg.sender) {
                rescue++;
            }
        }

        RescueDetails[] memory myRescue = new RescueDetails[](rescue);
        for(uint i = 0; i < totalRescueCount; i++) {
            if(AllRescueDetails[i].rescuerAddress == msg.sender) {
                myRescue[currentIndex] = AllRescueDetails[i];
                currentIndex++;
            }
        }

        return myRescue;

    }


    // -------------------------All Donation Functions---------------------------------------------

    function SendDonationRequest
    (
        string memory _language, 
        string memory _name, 
        string memory _phoneNo,
        string memory _location,
        string memory _pickupTime,
        string memory _pickupDay,
        string memory _foodItems,
        uint _quentity
    )public {

    }


}