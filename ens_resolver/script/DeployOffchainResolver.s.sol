// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console2.sol";

import "../src/OffchainResolver.sol";
import "openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract DeployOffchainResolver is Script {
    uint256 internal deployerKey;
    string internal resolverURL;
    address[] internal signerList;

    function setUp() public {
        deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        resolverURL = vm.envString("RESOLVER_URL");
        signerList = _loadSigners();
    }

    function run() external returns (OffchainResolver resolver) {
        setUp();

        vm.startBroadcast(deployerKey);
        resolver = new OffchainResolver();
        ERC1967Proxy proxy = new ERC1967Proxy(
            address(resolver),
            abi.encodeWithSelector(
                OffchainResolver.initialize.selector,
                resolverURL,
                signerList
            )
        );
        resolver = OffchainResolver(address(proxy));
        vm.stopBroadcast();

        console2.log("OffchainResolver deployed to", address(resolver));
        console2.log("Resolver URL", resolverURL);
        console2.log("Signer count", signerList.length);
    }

    function _loadSigners() internal returns (address[] memory signers) {
        string memory signersJson = vm.envOr("RESOLVER_SIGNERS", string("[]"));
        string memory wrapped = string.concat('{"signers":', signersJson, "}");
        signers = vm.parseJsonAddressArray(wrapped, ".signers");
    }
}
