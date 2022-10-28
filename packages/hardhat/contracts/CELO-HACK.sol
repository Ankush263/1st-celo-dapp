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
        bool rescuePickup;
        bool rescueRecieved;
        bool rescueClosed;
    }

    // struct DonationDetails {
    //     uint donationId;
    //     address donarAddress;
    //     string language;
    //     string name;
    //     string location;
    //     string phoneNo;
    //     string pickupTime;
    //     string pickupDay;
    //     string foodItems;
    //     uint quantity;
    //     bool NFTreceived;
    //     bool donationPickup;
    //     bool donationReceived;
    //     bool donationClosed;
    // }

    uint rescueCount = 0;
    uint donationCount = 0;

    RescueDetails[] public AllRescueDetails;
    // DonationDetails[] public AllDonationDetails;

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
        string memory _rescueInfo
    ) public {

        RescueDetails memory tempRescueDetails;

        tempRescueDetails.rescueId = rescueCount;
        tempRescueDetails.rescuerAddress = msg.sender;

        _safeMint(msg.sender, rescueCount);
        _setTokenURI(rescueCount, _rescueInfo);

        AllRescueDetails.push(tempRescueDetails);
        rescueCount++;
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

    // function SendDonationRequest
    // (
    //     string memory _language, 
    //     string memory _name, 
    //     string memory _phoneNo,
    //     string memory _location,
    //     string memory _pickupTime,
    //     string memory _pickupDay,
    //     string memory _foodItems,
    //     uint _quantity
    // )public {
    //     DonationDetails memory tempDonationDetails;

    //     tempDonationDetails.language = _language;
    //     tempDonationDetails.name = _name;
    //     tempDonationDetails.phoneNo = _phoneNo;
    //     tempDonationDetails.location = _location;
    //     tempDonationDetails.pickupTime = _pickupTime;
    //     tempDonationDetails.pickupDay = _pickupDay;
    //     tempDonationDetails.foodItems = _foodItems;
    //     tempDonationDetails.quantity = _quantity;

    //     donationCount++;

    //     AllDonationDetails.push(tempDonationDetails);
    // }


}