#ifndef CRM_ALL_TYPE_H
#define CRM_ALL_TYPE_H
#include <string>
#include <vector>

class BaseCrmType
{
  public:
	  virtual ~BaseCrmType(){}
	  virtual std::string  PrepareConnectHeader() = 0;
	  virtual std::string PrepareConnectTrailer() = 0;
	  virtual std::string PrepareAgentChangesHeader() = 0;
	  virtual int SendFirstConnectionData(std::vector<std::string> &lines,bool forceSendLoginAgents = false) = 0;
	  virtual std::string SendJsonData(int &clienId) = 0;
	  virtual int SendChanges(std::vector<std::string> &lines)=0;
	  virtual void SetAgentState()=0;
};


class WFM : public BaseCrmType
{
 public:

	 enum
	 {
		SignIn		= 1,			// Agent has signed into the routing platform.
		SignOut		= 2,			// Agent has signed off the routing platform.
		Logon		= 11,			// Available Agent is available and ready to take a contact. (IDLE)
		Release		= 12,			// Unavailable Agent is not available to take a contact.
		Inbound_1	= 13,			// Line 1 Agent is on an  incoming contact on line 1 (ESTABLISH agent answer).
		InBound_2	= 14,			// Line 2 Agent is on an incoming contact on line 2.
		Outbound_1	= 15,			// Line 1 Agent is on an outbound contact on line 1 (ESTABLISH), ageng calling dev.
		Outbound_2	= 16,			// Line 2 Agent is on an outbound contact on line 2.
		Hold		= 17,			// Hold Agent has placed a contact on hold (any line).
		InternalContact = 18,		// Internal Contact Agent is initiating a contact within the contact center.
		WrapUp		= 19,			// After-Contact Work Agent is unavailable while performing after-contact work.
		Conference	= 20,			// Conference Agent is participating in a conference with two or more contacts.
		Supervisor  = 21,			// Supervisor Agent is participating in a conference with the supervisor.
									//   (This state may be initiated by the agent or the supervisor.)
		ReleaseWithCode = 22,		// Working Off-Line Agent is unavailable while performing non-phone activities.
		CallsStatus = 23,			// list of call status
		Login		= 24
		

	 } TYPES;

	 WFM();
	 //
	 std::string  PrepareConnectHeader();
	 std::string PrepareConnectTrailer();
	 std::string  PrepareAgentChangesHeader();
	 int SendFirstConnectionData(std::vector<std::string> &lines, bool forceSendLoginAgents);
	 std::string  SendJsonData(int &clienId);
	 int SendChanges(std::vector<std::string> &lines);
	 void SetAgentState();
	 std::string m_CrmType;
};


#endif //CRM_ALL_TYPE_H
