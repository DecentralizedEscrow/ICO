pragma solidity ^0.4.13;

contract ERC20 {
  uint public totalSupply;
  function balanceOf(address who) constant returns (uint);
  function allowance(address owner, address spender) constant returns (uint);

  function transfer(address to, uint value) returns (bool ok);
  function transferFrom(address from, address to, uint value) returns (bool ok);
  function approve(address spender, uint value) returns (bool ok);
  event Transfer(address indexed from, address indexed to, uint value);
  event Approval(address indexed owner, address indexed spender, uint value);
}

/**
 * Math operations with safety checks
 */
contract SafeMath {
  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeDiv(uint a, uint b) internal returns (uint) {
    assert(b > 0);
    uint c = a / b;
    assert(a == b * c + a % b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function max64(uint64 a, uint64 b) internal constant returns (uint64) {
    return a >= b ? a : b;
  }

  function min64(uint64 a, uint64 b) internal constant returns (uint64) {
    return a < b ? a : b;
  }

  function max256(uint256 a, uint256 b) internal constant returns (uint256) {
    return a >= b ? a : b;
  }

  function min256(uint256 a, uint256 b) internal constant returns (uint256) {
    return a < b ? a : b;
  }

}

contract StandardToken is ERC20, SafeMath {

  /* Token supply got increased and a new owner received these tokens */
  event Minted(address receiver, uint amount);

  /* Actual balances of token holders */
  mapping(address => uint) balances;

  /* approve() allowances */
  mapping (address => mapping (address => uint)) allowed;

  /* Interface declaration */
  function isToken() public constant returns (bool weAre) {
    return true;
  }

  function transfer(address _to, uint _value) returns (bool success) {
    balances[msg.sender] = safeSub(balances[msg.sender], _value);
    balances[_to] = safeAdd(balances[_to], _value);
    Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint _value) returns (bool success) {
    uint _allowance = allowed[_from][msg.sender];

    balances[_to] = safeAdd(balances[_to], _value);
    balances[_from] = safeSub(balances[_from], _value);
    allowed[_from][msg.sender] = safeSub(_allowance, _value);
    Transfer(_from, _to, _value);
    return true;
  }

  function balanceOf(address _owner) constant returns (uint balance) {
    return balances[_owner];
  }

  function approve(address _spender, uint _value) returns (bool success) {

    // To change the approve amount you first have to reduce the addresses`
    //  allowance to zero by calling `approve(_spender, 0)` if it is not
    //  already 0 to mitigate the race condition described here:
    //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    require((_value == 0) || (allowed[msg.sender][_spender] == 0));

    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(address _owner, address _spender) constant returns (uint remaining) {
    return allowed[_owner][_spender];
  }

}

contract DESToken is StandardToken {

    string public name = "Decentralized Escrow Service";
    string public symbol = "DES";
    uint public decimals = 18;//Разрядность токена
	uint public HardCapEthereum = 66666000000000000000000 wei;//Максимальное количество собранного Ethereum - 66 666 ETH (задано в wei)
    
    //Массив с размороженными адресами, которым всегда разрешено осуществять переводы токенов (Pre-ICO)
    mapping (address => bool) public preICOAccount;
	
    address public founder = 0x51559efc1acc15bcafc7e0c2fb440848c136a46b;//Кошелек сбора средств
    address public owner = 0xE7F7d6cBCdC1fE78F938Bfaca6eA49604cB58D33;//Административные действия
	
	// Время начала ICO и время окончания ICO
	uint constant public TimeStart = ;//Константа - время начала ICO - 29.11.2017 в 15:00 по мск
	uint public TimeEnd = ;//Время окончания ICO - 27.12.2017 в 14:59 по мск
	
	// Время окончания бонусных этапов (недель)
	uint public TimeWeekOne = ;//1000 DES – начальная цена – 1-ая неделя
	uint public TimeWeekTwo = ;//800 DES – 2-ая неделя
	uint public TimeWeekThree = ;//666,666 DES – 3-ая неделя
	uint public TimeWeekFour = ;//571,428 DES – 4-ая неделя
    
	uint public TimeTransferAllowed = ;//Переводы токенов разрешены через месяц после ICO
	
	//Пулы ICO (различное время выхода на биржу: запрет некоторым пулам перечисления токенов до определенного времени)
	uint public PoolPreICO = 0;//Изначально 0 - данный пул формируется в случае поступления старых токенов (DEST и DESP, которые были проданы во время PreICO со старых смартконтрактов). Человек в ЛК указывает свой адрес эфириума, на котором хранятся DEST или DESP и ему на этот адрес приходят токены DES в таком же количестве + ещё 50%
	uint public PoolICO = ;//Пул ICO - выход на биржу через 1 месяц
	uint public PoolTeam = ;//Пул команды - выход на биржу через 1 месяц. 15%
	uint public PoolAdvisors = ;//Пул эдвайзеров - выход на биржу через 1 месяц. 7%
	uint public PoolBounty = ;//Пул баунти кампании - выход на биржу через 1 месяц. 3%
	
	//Стоимость токенов на различных этапах
	uint public PriceWeekOne = 1000000000000000 wei;//Стоимость токена во время недели 1
	uint public PriceWeekTwo = 1250000000000000 wei;//Стоимость токена во время недели 2
	uint public PriceWeekThree = 1500000000000000 wei;//Стоимость токена во время недели 3
	uint public PriceWeekFour = 1750000000000000 wei;//Стоимость токена во время недели 4
	
	//Технические переменные состояния ICO
    bool public ICOPaused = false; //Основатель может активировать данный параметр (true), чтобы приостановить ICO на неопределенный срок
    bool public StageWeekOne = false;//Этап недели 1 активен
    bool public StageWeekTwo = false;//Этап недели 2 активен
    bool public StageWeekThree = false;//Этап недели 3 активен
    bool public StageWeekFour = false;//Этап недели 4 активен
	
    //Технические переменные для хранения данных статистики
	uint public StatsEthereumRaised = 0;//Переменная сохранит в себе количество собранного Ethereum
	uint public StatsTokensSold = 0;//Переменная сохранит в себе количество проданных на ICO токенов
	
    
    Завершу, как только определимся с механизмом обмена старых токенов на новые:
•	Токены создаются во время продажи.
•	Создание токенов сопровождается событием Transfer
•	Токены переводятся также вручную
•	У команды существует возможность приостановить/продолжить/изменить цену/изменить время и т.д. ICO в случае критических ошибок

    /* События */
    event Buy(address indexed sender, uint eth, uint fbt);//Покупка токенов
    event TokensSent(address indexed to, uint256 value);
    event ContributionReceived(address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);
    event AllowedTransfer(address target, bool allow);//Наложение запрета на определенного покупателя на переводы токенов

    function DESToken(address _owner, address _founder) payable {
        owner = _owner;
        founder = _founder;

        // Move team token pool to founder balance
        balances[founder] = team;
        // Sub from total tokens team pool
        totalTokens = safeSub(totalTokens, team);
        // Total supply is 100000000 (100 million) tokens
        totalSupply = totalTokens;
        balances[owner] = totalSupply;
    }

    //Функция возвращает текущую стоимость в wei 1 токена
    function price() constant returns (uint) {
        return 781250000000000 wei;
    }

    //Функция приобретения токенов
    function buy() public payable returns(bool) {

        require(!ICOPaused);//Покупка разрешена, если ICO не приостановлено
        require(msg.value>0);//Полученная сумма в wei должна быть больше 0
        require(now >= TimeStart);//Условие продажи - ICO началось
        require(now <= TimeEnd);//Условие продажи - ICO не завершено

        uint tokens = safeDiv(msg.value,price());//Количество токенов, которое должен получить покупатель
        
        require(safeAdd(StatsEthereumRaised, msg.value) <= HardCapEthereum);//Собранный эфир не больше hard cap

        
        require(balances[owner]>tokens);/////// Total tokens should be more than user want's to buy

        // Отправить полученные ETH на кошелек основателя
        founder.transfer(msg.value);

        balances[msg.sender] = safeAdd(balances[msg.sender], tokens);// Зачисление токенов на счет покупателя
        balances[owner] = safeSub(balances[owner], tokens);// Вычет токенов из общего количества продаваемых токенов

        // Обновляем статистику
        StatsTokensSold  = safeAdd(StatsTokensSold, tokens);//Продано токенов
        StatsEthereumRaised = safeAdd(StatsEthereumRaised, msg.value);//Собрано ETH


        // /* Записать в блокчейн события */
        Buy(msg.sender, msg.value, tokens);
        TokensSent(msg.sender, tokens);
        ContributionReceived(msg.sender, msg.value);
        Transfer(owner, msg.sender, tokens);

        return true;
    }
    
    //Запретить определенному покупателю осуществлять переводы его токенов
    /// @параметр target Адрес покупателя, на который установить запрет
    /// @параметр allow Установить запрет (true) или запрет снят (false)
    function allowTransfer(address target, bool allow) onlyOwner public {
        preICOAccount[target] = allow;
        AllowedTransfer(target, allow);
    }

    /**
     * Emergency stop whole ICO event
     */
    function EventEmergencyStop() onlyOwner() {
        ICOPaused = true;
    }

    function EventEmergencyContinue() onlyOwner() {
        ICOPaused = false;
    }

    /**
     * ERC 20 Standard Token interface transfer function
     *
     * Prevent transfers until halt period is over.
     */
    function transfer(address _to, uint256 _value) isActive() returns (bool success) {
        
        //Если переводы токенов для всех участников еще не разрешены (1 месяц после ICO), проверяем, участник ли это Pre-ICO. Если нет, запрещаем перевод
        if(now < TimeTransferAllowed){        
        require(!preICOAccount[_from]);//Если переводы еще не разрешены по времени, переводить могут только участники Pre-ICO
        }
        
        return super.transfer(_to, _value);
    }
    /**
     * ERC 20 Standard Token interface transfer function
     *
     * Prevent transfers until halt period is over.
     */
    function transferFrom(address _from, address _to, uint256 _value) isActive() returns (bool success) {
        return super.transferFrom(_from, _to, _value);
    }

    /**
     * Сжечь все оставшиеся токены
     */
    function burnRemainingTokens() isActive() onlyOwner() {
        Burn(owner, balances[owner]);
        balances[owner] = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

	//Приостановлено ли ICO или запущено
    modifier isActive() {
        require(!ICOPaused);
        _;
    }

    /**
     * Транзакция получена - запустить событие покупки
     */
    function() payable {
        buy();
    }

    /**
     * Сменить владельца
     */
    function changeOwner(address _to) onlyOwner() {
        balances[_to] = balances[owner];
        balances[owner] = 0;
        owner = _to;
    }

    /**
     * Сменить основателя
     */
    function changeFounder(address _to) onlyOwner() {
        balances[_to] = balances[founder];
        balances[founder] = 0;
        founder = _to;
    }
}