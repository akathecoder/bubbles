export const ERC20Abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function nonces(address owner) view returns (uint256)",
  "function version() view returns (string)",
  "function permit(address owner, address spender, uint256 value, uint256 deadline, bytes signature)",
  "function allowance(address owner, address spender) view returns (uint256)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
