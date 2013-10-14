package com.wqt.web.command;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.wqt.model.User;
import com.wqt.service.WeddingCardService;

/**
 * @author Jinde
 * @since 2013-10-14
 * 
 */
public class UploadPhotoCommand implements ICommand {

	private WeddingCardService weddingCardService = new WeddingCardService();
	
	private static final Logger LOG = Logger.getLogger(UploadPhotoCommand.class);

	/**
	 * 
	 */
	public UploadPhotoCommand() {

		super();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wqt.web.command.ICommand#execute(javax.servlet.http.HttpServletRequest
	 * , javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User user = (User) request.getSession().getAttribute("loginUser");
	}

	private void uploadPhoto(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
//		//为解析类提供配置信息  
//        DiskFileItemFactory factory = new DiskFileItemFactory();  
//        //创建解析类的实例  
//        ServletFileUpload sfu = new ServletFileUpload(factory);  
//        //开始解析  
//        sfu.setFileSizeMax(1024*400);  
//        //每个表单域中数据会封装到一个对应的FileItem对象上  
//        try {  
//            List<FileItem> items = sfu.parseRequest(req);  
//            //区分表单域  
//            for (int i = 0; i < items.size(); i++) {  
//                FileItem item = items.get(i);  
//                //isFormField为true，表示这不是文件上传表单域  
//                if(!item.isFormField()){  
//                    ServletContext sctx = getServletContext();  
//                    //获得存放文件的物理路径  
//                    //upload下的某个文件夹   得到当前在线的用户  找到对应的文件夹  
//                      
//                    String path = sctx.getRealPath("/upload");  
//                    System.out.println(path);  
//                    //获得文件名  
//                    String fileName = item.getName();  
//                    System.out.println(fileName);  
//                    //该方法在某些平台(操作系统),会返回路径+文件名  
//                    fileName = fileName.substring(fileName.lastIndexOf("/")+1);  
//                    File file = new File(path+"\\"+fileName);  
//                    if(!file.exists()){  
//                        item.write(file);  
//                        //将上传图片的名字记录到数据库中  
//                          
//                        resp.sendRedirect("/upload/ok.html");  
//                    }  
//                }  
//            }  
//        } catch (Exception e) {  
//            e.printStackTrace();  
//        } 
	}

}
