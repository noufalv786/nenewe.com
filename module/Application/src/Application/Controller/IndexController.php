<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;
use Application\Model\Login as LoginModel;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Authentication\AuthenticationService;
use Zend\View\Model\ViewModel;
use Zend\Json\Json;
class IndexController extends AbstractActionController
{
	private $_loginmodel = null;
	private $_adapter;
	protected $authservice;
	public $storage;
	
	
	private function _getLoginModel()
    {
        if (null === $this->_loginmodel) {
            $this->_adapter = $this->getServiceLocator()->get('Zend\Db\Adapter\Adapter');
            $this->_loginmodel = new LoginModel($this->_adapter);
        }
    }
	
	public function getAuthService()
    {
        if (!$this->authservice) {
            $this->authservice = $this->getServiceLocator()
                    ->get('AuthService');
        }
		
        return $this->authservice;
    }
	public function getSessionStorage()
    {
        if (!$this->storage) {
            $this->storage = $this->getServiceLocator()
                                  ->get('Application\Model\MyAuthStorage');
        }
         
        return $this->storage;
    }
	
    public function indexAction()
    {
        return new ViewModel();
    }
	
	public function usersAction()
    {
		if (null === $this->_loginmodel) {
            $this->_getLoginModel();
        }
	$loginDetails=$this->_loginmodel->getAll();
	
	
	$layout = $this->layout();
  	$layout->setTemplate('layout/layout');

	
	$viewModel = new ViewModel(array(
			'logindetails'=>$loginDetails
		
     ));
	$viewModel->setTemplate('application/users/users.phtml');
		
	return $viewModel;
		
     return new ViewModel();
	
	
	   
    }
	
	/** 
		Method1: SaveUser()
		Decription: Save the user details 
		
	**/
		
	public function saveuserAction()
    {
      	if (null === $this->_loginmodel) {
            $this->_getLoginModel();
        }
		
		
		$request = $this->getRequest();
	    if ($request->isPost()){
		  
		  $name=$request->getPost('name');
		  $email=$request->getPost('email');
		  $phone=$request->getPost('phone'); 
		  $password=$request->getPost('password');
		  
		
		  //before save , check for duplicate entry or not
		
		  $valueExist= $this->_loginmodel->getUserInfo( $email);
		  if(count($valueExist)<=0){
						
					$dbData = array(
							   
							   'name'=>$name,
							  
							   'email_id'=>$email,
							   'phone'=>$phone,
							   'password'=>$password
							
							);
					$this->_loginmodel->add($dbData);	
				echo "success";
				exit;					
						
			}else{
				
				echo "exist";
				exit;
				
			}
			
		  
		  
		}else{
			
			
			echo "error";
			exit;
			
		}
		
	   
    }
	
	/** 
		Method1: EditUser()
		Decription: Edit the user details 
		
	**/
	
	public function edituserAction()
    {
       if (null === $this->_loginmodel) {
            $this->_getLoginModel();
        }
		
		
		$request = $this->getRequest();
	    if ($request->isPost()){
		  
		  $name=$request->getPost('name');
		  $email=$request->getPost('email');
		  $phone=$request->getPost('phone'); 
		  $password=$request->getPost('password');
		  		
		  $dbData = array(
							   
							   'name'=>$name,
							  
							   'email_id'=>$email,
							   'phone'=>$phone,
							   'password'=>$password
							
						);
			$this->_loginmodel->update($dbData,  $email);
			echo "success";
			exit;					
						
			 
		}else{
			
			
			echo "error";
			exit;
			
		}
	   
    }
	
	/** 
		Method1: Delete User()
		Decription:Delete the user details 
		
	**/
	public function deleteuserAction()
    {
       if (null === $this->_loginmodel) {
            $this->_getLoginModel();
        }
		
		
		$request = $this->getRequest();
	    if ($request->isPost()){
		  
		
		  $email=$request->getPost('emailId');
		
		  		
		
			$this->_loginmodel->delete($email);
			echo "success";
			exit;					
						
			 
		}else{
			
			
			echo "error";
			exit;
			
		}
	   
    }
	
	/** 
		Method1: User Detais 
		Decription: Get the user details by Email Id 
		
	**/
	
	public function getuserAction()
    {
     	if (null === $this->_loginmodel) {
            $this->_getLoginModel();
        }
		
		$request = $this->getRequest();
		if ($request->isPost()) {
   
			
			$emailId=$request->getPost('emailId');
			
			$userDetails=$this->_loginmodel->getUserInfo($emailId);
			
			if(!empty($userDetails)){
			$data= array(
							'name' =>$userDetails[0]['name'],
							'email'=> $userDetails[0]['email_id'],
							'phone'=> $userDetails[0]['phone'],
							'password'=> $userDetails[0]['password'],
							
							
							
							);
		
				return $this->getResponse()->setContent(Json::encode($data));
				exit;
		
			}else{
				$data= array();
				return $this->getResponse()->setContent(Json::encode($data));
				exit;
				
				
			}
			
			
			
		 }
	   
    }
}
