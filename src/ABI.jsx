const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_imageFileCID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_imageFileName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "addBlog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "displayAllBlogs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "imgFileCID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "imgFileName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "content",
                        "type": "string"
                    }
                ],
                "internalType": "struct blog.aBlog[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "myBlogs",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imgFileCID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imgFileName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export default abi;


// solidity code

// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract blog {
//     struct aBlog{
//         string name;
//         string imgFileCID;
//         string imgFileName;
//         string content;
//     }

//     aBlog[] public myBlogs;

//     function addBlog(string memory _name, string memory _imageFileCID, string memory _imageFileName, string memory _content) public {
//         aBlog memory newA = aBlog(_name, _imageFileCID, _imageFileName, _content);
//         myBlogs.push(newA);
//     }

//     function displayAllBlogs() public view returns (aBlog [] memory){
//         return myBlogs;
//     }
// }
