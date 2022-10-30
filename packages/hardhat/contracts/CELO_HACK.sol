// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CELO_HACK is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    struct RescueDetails {
        uint rescueId;
        address owner;
        string rescueInfo;
        address rescuerAddress;
        bool rescuePickup;
        bool rescueRecieved;
        bool rescueClosed;
    }

    struct DonationDetails {
        uint donationId;
        address owner;
        string donationInfo;
        address donarAddress;
        bool donationPickup;
        bool NFTreceived;
        bool donationReceived;
        bool donationClosed;
    }

    uint rescueCount = 0;
    uint donationCount = type(uint256).max;

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
        string memory _rescueInfo

    ) public {

        RescueDetails memory tempRescueDetails;

        tempRescueDetails.rescueId = rescueCount;
        tempRescueDetails.owner = owner;
        tempRescueDetails.rescuerAddress = msg.sender;
        tempRescueDetails.rescueInfo = _rescueInfo;

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
        require(AllRescueDetails[_rescueId].rescuePickup == false);
        require(AllRescueDetails[_rescueId].rescueClosed == false);

        AllRescueDetails[_rescueId].rescuePickup = true;
    }

    function getRescueRecieved(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllRescueDetails[_rescueId].rescuePickup == true);
        require(AllRescueDetails[_rescueId].rescueClosed == false);
        require(AllRescueDetails[_rescueId].rescueRecieved == false);

        AllRescueDetails[_rescueId].rescueRecieved = true;
    }

    function getRescueClosed(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllRescueDetails[_rescueId].rescuePickup == true);
        require(AllRescueDetails[_rescueId].rescueRecieved == true);
        require(AllRescueDetails[_rescueId].rescueClosed == false);

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
        string memory _donationInfo

    )public {
        
        DonationDetails memory tempDonationDetails;

        tempDonationDetails.donationId = donationCount;
        tempDonationDetails.owner = owner;
        tempDonationDetails.donarAddress = msg.sender;
        tempDonationDetails.donationInfo = _donationInfo;

        _safeMint(msg.sender, donationCount);
        _setTokenURI(donationCount, _donationInfo);
        _transfer(msg.sender, owner, donationCount);

        AllDonationDetails.push(tempDonationDetails);
        donationCount--;
    }

    function getAllDonationRequest() public view returns(DonationDetails[] memory) {
        return AllDonationDetails;
    }

    function getDonationPickup(uint _donationId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllDonationDetails[_donationId].NFTreceived == false);
        require(AllDonationDetails[_donationId].donationReceived == false);
        require(AllDonationDetails[_donationId].donationClosed == false);
        require(AllDonationDetails[_donationId].donationPickup == false);

        AllDonationDetails[_donationId].donationPickup = true;
    }

    function giveNFTtoDonar(uint _donationId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllDonationDetails[_donationId].donationPickup == true);
        require(AllDonationDetails[_donationId].NFTreceived == false);
        require(AllDonationDetails[_donationId].donationReceived == false);
        require(AllDonationDetails[_donationId].donationClosed == false);

        _transfer(msg.sender, AllDonationDetails[_donationId].donarAddress, _donationId);
        AllDonationDetails[_donationId].NFTreceived = true;
    }

    function getDonationReceived(uint _donationId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllDonationDetails[_donationId].donationPickup == true);
        require(AllDonationDetails[_donationId].NFTreceived == true);
        require(AllDonationDetails[_donationId].donationReceived == false);
        require(AllDonationDetails[_donationId].donationClosed == false);

        AllDonationDetails[_donationId].donationReceived = true;
    }

    function getDonationClosed(uint _donationId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllDonationDetails[_donationId].donationPickup == true);
        require(AllDonationDetails[_donationId].NFTreceived == true);
        require(AllDonationDetails[_donationId].donationReceived == true);
        require(AllDonationDetails[_donationId].donationClosed == false);

        AllDonationDetails[_donationId].donationClosed = true;
    }

    function getAllMyDonationDetails() public view returns(DonationDetails[] memory) {
        uint totalDonationCount = donationCount;
        uint donation = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalDonationCount; i++) {
            if(AllDonationDetails[i].donarAddress == msg.sender) {
                donation++;
            }
        }

        DonationDetails[] memory myDonar = new DonationDetails[](donation);
        for(uint i = 0; i < totalDonationCount; i++) {
            if(AllDonationDetails[i].donarAddress == msg.sender) {
                myDonar[currentIndex] = AllDonationDetails[i];
                currentIndex++;
            }
        }

        return myDonar;
    }

    



}