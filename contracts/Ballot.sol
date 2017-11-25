pragma solidity ^0.4.2;

contract Ballot {
    address chairperson;
    mapping (address => uint) balances;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    struct Voter {
        uint number_actor;
        mapping(uint => uint) actors;
    }

    struct NSP {
        bytes32 hash_password;
        bytes32 name;
    }

    struct Actor {
        bytes32 name;
        uint vote_count;
    }

    struct Program {
        bytes32 name;
        uint start;
        uint end;
        uint number_actors;
        uint one_vote_price; // Ballot coin
        mapping (uint => Actor) actors;
        mapping(address => Voter) voters;
    }

    uint number_programs;
    mapping(uint => Program) public Programs;
    mapping(address => NSP) nsps;

    function Ballot() {
        chairperson = tx.origin;
        balances[chairperson] = 100000;
        
        // bytes32 name = "Chuong trinh 1"; 
        // createProgram(name,10,20,0);
        // uint id_program = 0;
        // createActor(id_program, "Thi sinh 1");
        // createActor(id_program, "Thi sinh 2");
        // createActor(id_program, "Thi sinh 3");
        // createActor(id_program, "Thi sinh 4");
        // createActor(id_program, "Thi sinh 5");
        uint id_program;
        Programs[id_program] = Program({
            name: "Blockathon",
            start: now,
            end: now + 2*1 days,
            number_actors: 0,
            one_vote_price: 1
        });
        
        Programs[id_program].number_actors = 5;
        Programs[id_program].actors[0] = Actor({
            name: "The NULL",
            vote_count: 0
        });
        Programs[id_program].actors[1] = Actor({
            name: "Ha Thanh",
            vote_count: 0
        });
        Programs[id_program].actors[2] = Actor({
            name: "YOLO Team",
            vote_count: 0
        }); 
        Programs[id_program].actors[3] = Actor({
            name: "GenStack",
            vote_count: 0
        }); 
        Programs[id_program].actors[4] = Actor({
            name: "HCM Teams",
            vote_count: 0
        }); 
    }

    modifier onlyChairPerson() {
        require(msg.sender == chairperson);
        _;
    }

    function createNSP(address addr, bytes32 name, bytes32 hash_password, uint init_balance) onlyChairPerson {
        nsps[addr] = NSP({
            name: name,
            hash_password: hash_password
        });
        balances[chairperson] -= init_balance;
        balances[addr] = init_balance;
    }

    function requestSendCoinByNSP(bytes32 hash_password, address to_acc, uint amount) {
        NSP storage nsp = nsps[msg.sender];
        if (nsp.hash_password == hash_password) {
            commonSendCoin(to_acc, amount);
        }
    }

    function verifyNSP(address nsp_addr, bytes32 hash_password) returns(bool) {
        NSP storage nsp = nsps[nsp_addr];
        return nsp.hash_password == hash_password;
    }

    function commonSendCoin(address to, uint amount) returns(bool) {
        if(balances[msg.sender] < amount) {
            return false;
        }
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function getNSPHash(address addr) returns(bytes32) {
        return nsps[addr].hash_password;
    }



    function createProgram(bytes32 name, uint start, uint end, uint number_actor) returns (bool) {
        if(msg.sender == chairperson) {
            return false;
        }
        uint id_program = number_programs++;

        Programs[id_program] = Program({
            name: name,
            start: start,
            end: end,
            number_actors: number_actor,
            one_vote_price: 1
        });
        return true;
    }

    function createActor(uint id_program, bytes32 name) returns (bool) {
        if(msg.sender == chairperson) {
            return false;
        }

        Program storage pro = Programs[id_program];
        uint id_actor = pro.number_actors++;
        pro.actors[id_actor] = Actor({
            name: name,
            vote_count: 0
        });
        return true;
    }

    function sendCoin(address to, uint amount) onlyChairPerson returns (bool) {
        if(balances[chairperson] < amount) {
            return false;
        }
        balances[chairperson] -= amount;
        balances[to] += amount;
        return true;
    } 

    function voteUpdate( uint id_Program, uint id_actor, uint weight) returns (bool) {
        
        Program storage e = Programs[id_Program];
       
        //NOTE require exist Program
        if(e.name=="" || (now<e.start || now>e.end)){
            return false;
        }

        //NOTE require exist actor
        if(e.actors[id_actor].name==""){
            return false;
        }

        // Test voter voted actor
        for (uint i=0; i < e.voters[msg.sender].number_actor; i++){
            if(e.voters[msg.sender].actors[i]==id_actor) {
                return false;
            }
        }

        uint index = e.voters[msg.sender].number_actor++;
        e.voters[msg.sender].actors[index] = id_actor;
        
        balances[msg.sender] -= weight*e.one_vote_price;
        balances[chairperson] += weight*e.one_vote_price;
        e.actors[id_actor].vote_count += weight;
        return true;
    }

    function getVoteCount(uint id_program, uint id_actor) returns (uint){
         Program storage e = Programs[id_program];
         return e.actors[id_actor].vote_count;
    }

    function getBalance(address addr) constant returns (uint) {
        return balances[addr];
    }

    function getProgram(uint id) constant returns(bytes32,uint, uint, uint) {
        Program storage pro = Programs[0];
        return (pro.name, pro.start, pro.end, pro.number_actors);
    }

    function getNumberProgram() constant returns(uint) {
        return number_programs;
    }

    function getActor(uint id_program, uint index_actor) constant returns(bytes32, uint) {
        Program storage pro = Programs[id_program];
        return (pro.actors[index_actor].name, pro.actors[index_actor].vote_count);
    }

    // function isChair(address addr) returns(bool) {
    //     return chairperson == addr;
    // }
}