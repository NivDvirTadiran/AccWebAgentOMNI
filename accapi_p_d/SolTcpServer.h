//===========================================================================
//								SolTcpServer.h
//
//---------------------------------------------------------------------------
// DESCRIPTION: @{HDES}
// -----------
//
//---------------------------------------------------------------------------
// CHANGES LOG: @{HREV}
// -----------
// Revision: 01.00
// By      : Shaul Waller
// Date    : 13/04/2002 7:10:18
// Comments: First Issue
//===========================================================================
//								Include one time.
//===========================================================================
#ifndef	SOLTCPSERVER_H
#define	SOLTCPSERVER_H
#include "sollib.h"
#include <stdlib.h>
#include <vector>
class ClientConnection
{
public:
	Stream m_Stream;
	int y;
};
class SolTcpServer
{
public:
	int m_PortNumber;
	int m_NumberOfConnections;
	std::vector<ClientConnection>  m_ClientConnection;

};
//===========================================================================
//							End Of SolTcpServer.h
//===========================================================================
#endif // SOLTCPSERVER_H
