<?php

namespace  Application\Model;

use Zend\Db\Sql\Sql;
use Zend\Db\ResultSet\ResultSet;
//Zend\Feed\PubSubHubbub\Model
use Zend\Feed\PubSubHubbub\Model\AbstractModel;
use Zend\Db\Sql\Predicate;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Login extends AbstractModel
{

    private $_adapter;

    public function __construct($adapter)
    {
        $this->_adapter = $adapter;
    }
	
	 /*
     * fetch all Restaurants
     */    
    public function getAll()
    {
		
        $sql = new Sql($this->_adapter);
        $select = $sql->select();
		$select->quantifier('DISTINCT');
        $select->from('tbl_login')
                ->columns(array('email_id','name','phone','password'));
		
        $statement = $sql->prepareStatementForSqlObject($select); 
		//echo $sql->getSqlstringForSqlObject($select); die ;
		
        $result = $statement->execute();

        $resultSet = new ResultSet();
        $resultSet->initialize($result);
		//print_r($resultSet->toArray());
		//exit;
        return $resultSet->toArray();
    }
	
	
		/*
	* Get User details
	
	*/ 
	
	public function getUserInfo($emailId)
    {
        $sql = new Sql($this->_adapter);
        $select = $sql->select();
        $select->from('tbl_login')
                ->columns(array('email_id','password', 'name','phone'))
                ->where('tbl_login.email_id = ' . "'".$emailId."'");

        $statement = $sql->prepareStatementForSqlObject($select);
        $result = $statement->execute();

        $resultSet = new ResultSet();
        $resultSet->initialize($result);

        //return $resultSet->current();
        return $resultSet->toArray();
    }

	
	
	
    public function add($data)
    {

	
        if (!empty($data)) {
            $sql = new Sql($this->_adapter);
            $insert = $sql->insert();
            $insert->into('tbl_login');
            $insert->values($data);
            $statement = $sql->prepareStatementForSqlObject($insert);
            $statement->execute();
			$lastInsertId = $this->_adapter->getDriver()->getLastGeneratedValue(); 
			
        }
		return $lastInsertId;
		
       // return true;
    }
	
	 
	
	 /*
     * Update Locations 
     */   
    
    public function update($data, $emailId)
    {
	
        if (!empty($emailId)) {

            $sql = new Sql($this->_adapter);
            $update = $sql->update('tbl_login');
            $update->set($data)
                    ->where('tbl_login.email_id='."'".$emailId."'");
            $statement = $sql->prepareStatementForSqlObject($update);
            $statement->execute();
        }

        return true;
    }

	
    public function delete($emailId)
    {
        $sql = new Sql($this->_adapter);
        $delete = $sql->delete('tbl_login');
        $delete->where('tbl_login.email_id='."'".$emailId."'");
        $statement = $sql->prepareStatementForSqlObject($delete);
        $statement->execute();

        return true;
    }

  
   
}