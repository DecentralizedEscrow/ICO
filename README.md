Descrow Smart contract documentation
===================

The following functions are present:
-------------
***Parameters and functions can be changed and executed an unlimited number of times.***

###### setTimeEnd
Change the ICO end time, instead of predefined.
###### disallowTransfer
Prohibit token transfers for specific address within 30 days after the ICO, or manually set the time up to which the token transfers are prohibited.
###### setTimeTransferAllowance
Change the time before which token transfers are prohibited.
###### setTokenPrice
Manually set the token price (in wei - https://etherconverter.online), and the sale will go at a given cost, and not at a price that depends on the week of the sale. Set the value to 0 to cancel and get back to default.
###### changeWallet
Set different fundraising wallet (Ethereum multisig or ordinary wallet address as a parameter, but not Smart contract address!).
###### sendPreICOTokens
Mint and send a predefined number of tokens to the PreICO participant.
###### sendICOTokens
Mint and send a predefined number of tokens to the ICO participant.
###### sendTeamTokens
Send tokens to a member of the team upon completion of the ICO. Note: recipient's token transfers will be prohibited within 30 days after the ICO end time.
###### sendAdvisorsTokens
Send tokens to advisor upon completion of the ICO. Note: recipient's token transfers will be prohibited within 30 days after the ICO end time.
###### sendBountyTokens
Send tokens to bounty participant upon completion of the ICO. Note: recipient's token transfers will be prohibited within 30 days after the ICO end time.
###### changeOwner
Change Smart contract's Owner (administrator).
###### finishCrowdsale
Finish the ICO. Run only if necessary to stop and finish the sale. No return back there. Team, bounty and adviser token pools are created depending on the volume of sales, and transferred to the Owner (administrator).
###### EventEmergencyStop
Temporarily suspend all sales and transfers of tokens in case of unforeseen circumstances, for an indefinite period.
###### EventEmergencyContinue
Continue selling, cancel the emergency suspension.

Informational functions:
----------
###### PoolICO
See the number of tokens in the ICO pool (the number of tokens sold on the ICO).
###### PoolPreICO
See the number of tokens in the PreICO pool (increases after each manual sending participants of PreICO tokens).
###### PoolBounty
See the number of tokens in the Bounty pool (only upon the completion of the ICO, it is generated after the completion of sales and is 3% of the sold tokens).
###### PoolAdvisors
See the number of tokens in the Advisors pool (only upon the completion of the ICO, it is generated after the completion of sales and is 7% of the sold tokens).
###### PoolTeam
See the number of tokens in the Team members pool (only upon the completion of the ICO, it is generated after the completion of sales and is 15% of the sold tokens).
###### Price
See the current token price in wei (https://etherconverter.online to convert to other units, such as ETH).
###### owner
View the current address of the Smart contract's Owner (administrator).
###### wallet
View the current fundraising wallet address. 
###### StatsTotalSupply
See how many total tokens were issued.
###### StatsEthereumRaised
See how much total ETH was collected in wei (https://etherconverter.online to convert to other units, such as ETH).
###### ICOPaused
Whether the ICO is now suspended (true or false).
###### ICOFinished
Whether the ICO has ended (true or false).
###### noTransfer
Whether a specific address is prohibited from tranferring tokens within 30 days after the ICO end or at a manually set time before which token transfers are prohibited (the parameter is an Ethereum address).
###### TimeTransferAllowed
View the time from which the token transfers will be allowed.
###### PriceManual
See which token price is now set manually. If more than 0 is set, the tokens are sold for this manual price, rather than at a price that depends on the current week of sales.
###### balanceOf
Check token balance of specified address (the parameter is an Ethereum address).

Русский язык
===================

Документация по смартконтракту Descrow
===================

Код контракта компилируется в байткод и отправлется в блокчейн эфириум через сервис myetherwallet.com. После того, как контракт опубликован, он удобно управляется через интерфейс на данном сайте. Для этого необходимо на странице https://www.myetherwallet.com/#contracts ввести адрес смартконтракта и JSON-код интерфейса, а затем войти под кошельком владельца смартконтракта.

После этого доступны следующие функции:
-------------
***Параметры можно изменять неограниченное количество раз, функции запускать неограниченное количество раз.***

###### setTimeEnd
Изменить время окончания ICO, установить другое, вместо заранее заданного.
###### disallowTransfer
Запретить переводы токенов конкретному адресу в течение 30 дней после ICO или на вручную установленное время, до которого переводы токенов запрещены (по умолчанию применяется ко всем, кроме участников Pre-ICO, но можно вручную применить и к ним) (в качестве параметра указывается Ethereum-адрес). 
###### setTimeTransferAllowance
Изменить время, до наступления которого переводы токенов запрещены. Можно установить прошедшее время, чтобы разрешить всем переводить, а можно очень большое, чтобы никто никогда не мог переводить токены.
###### setTokenPrice
Вручную установить стоимость токена (в wei - https://etherconverter.online), и продажа будет идти по заданной стоимости, а не по цене, которая зависит от недели продажи. Установить значение на 0, чтобы отменить и стоимость и дальше зависела от недели продажи.
###### changeWallet
Указать другой кошелек сбора средств (на который поступают ETH при покупке токенов) (в качестве параметра указывается Ethereum-адрес кошелька, но не смартконтракта! Разрешены обычные и multisig кошельки).
###### sendPreICOTokens
Создать и отправить участнику PreICO заданное количество токенов. В качестве параметров: Ethereum-адрес получателя и количество, например, 150 токенов).
###### sendICOTokens
Создать и отправить участнику ICO заданное количество токенов. В качестве параметров: Ethereum-адрес получателя и количество, например, 150 токенов).
###### sendTeamTokens
Отправить токены члену команды по завершению ICO. Переводы токенов запрещены получателю в течение 30 дней после ICO или на вручную установленное время, до которого переводы токенов запрещены. (в качестве параметра указывается Ethereum-адрес и количество токенов, например, 150 токенов). 
###### sendAdvisorsTokens
Отправить токены эдвайзеру по завершению ICO. Переводы токенов запрещены получателю в течение 30 дней после ICO или на вручную установленное время, до которого переводы токенов запрещены. (в качестве параметра указывается Ethereum-адрес и количество токенов, например, 150 токенов). 
###### sendBountyTokens
Отправить баунти токены по завершению ICO. Переводы токенов запрещены получателю в течение 30 дней после ICO или на вручную установленное время, до которого переводы токенов запрещены. (в качестве параметра указывается Ethereum-адрес и количество токенов, например, 150 токенов). 
###### changeOwner
Сменить администратора (владельца) смартконтракта. (в качестве параметра указывается Ethereum-адрес).
###### finishCrowdsale
Полностью завершить ICO. Запускать исключительно, если необходимо завершить продажи. Возврата обратно нет. Создаются токены команды, баунти и эдвайзеров в зависимости от объема продаж, перечисляются администратору (основателю), блокируются на 30 дней или на вручную установленное время, до которого переводы токенов запрещены.
###### EventEmergencyStop
Временно приостановить все продажи и переводы токенов в случае непредвиденных обстоятельств на неопределенный срок.
###### EventEmergencyContinue
Продолжить продажи, отменить экстренную приостановку.

Информационные функции:
----------
###### PoolICO
Узнать количество токенов в пуле ICO (количество проданных на ICO токенов).
###### PoolPreICO
Узнать количество токенов в пуле PreICO (который увеличивается по мере ручной отправки участникам PreICO токенов).
###### PoolBounty
Узнать количество токенов в пуле баунти (только по факту завершения ICO, он генерируется после завершения продаж и составляет 3% от проданных токенов).
###### PoolAdvisors
Узнать количество токенов в пуле эдвайзеров (только по факту завершения ICO, он генерируется после завершения продаж и составляет 7% от проданных токенов).
###### PoolTeam
Узнать количество токенов в пуле команды (только по факту завершения ICO, он генерируется после завершения продаж и составляет 15% от проданных токенов).
###### Price
Посмотреть текущую стоимость покупки одного токена в wei (https://etherconverter.online чтобы конвертировать в другие единицы, например ETH).
###### owner
Посмотреть актуальный адрес администратора (владельца) смартконтракта.
###### wallet
Посмотреть актуальный адрес кошелька сбора средств.
###### StatsTotalSupply
Посмотреть, сколько всего токенов было выпущено.
###### StatsEthereumRaised
Посмотреть, сколько всего ETH было собрано (в wei, https://etherconverter.online чтобы конвертировать в другие единицы).
###### ICOPaused
Приостановлено ли ICO сейчас (истина или ложь).
###### ICOFinished
Завершено ли ICO (истина или ложь).
###### noTransfer
Запрещен ли конкретному адресу перевод токенов в течение 30 дней после ICO или на вручную установленное время, до которого переводы токенов запрещены (в качестве параметра указывается Ethereum-адрес).
###### TimeTransferAllowed
Посмотреть время, начиная с которого будут разрешены переводы токенов.
###### PriceManual
Посмотреть, какая стоимость токена сейчас указана вручную. Если указана больше 0, токены продаются именно по ней, а не по стоимости, зависящей от недели продаж.
###### balanceOf
Сколько токенов на счету на конкретном адресе (в качестве параметра указывается Ethereum-адрес).
