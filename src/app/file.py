
import os
import glob
import xml.etree.ElementTree as ElementTree
import logging
from src.app.logger import Logger
from src.config import Config
from xlwt import Workbook, easyxf

class File:
    """
    Used for file operations
    """
    trees = dict()
    packets = dict()

    def __init__(self):
        """
        Constructor Method
        :param directory: String, directory of packets
        :param file_format: String
        :param output: String
        :return: None
        """
        self.file_directory = Config.FILE_DIRECTORY
        self.file_format = Config.FILE_FORMAT
        self.output = Config.OUTPUT
        self.logger = Logger('File')

    def set_xml(self, filename):
        """
        Used for add xml files to dictionary
        :param filename: String 
        :return: None
        """
        try:
            tree = ElementTree.parse(filename)
            self.trees[filename] = tree
        except Exception as e:
            self.logger.log(logging.WARNING, "XML parse error")
            self.logger.log(logging.ERROR, e)
            

    def read_from_file(self):
        """
        Used for read packets in given directory
        :param: None
        :return: None
        """
        try:
            for filename in glob.iglob(self.file_directory + self.file_format, recursive=True):
                # print(filename)
                if os.path.exists(filename):
                    self.set_xml(filename)
        except Exception as e:
            self.logger.log(logging.WARNING, "File read error")
            self.logger.log(logging.ERROR, e)

    def parse_xml(self):
        """
        Used for parse xml file
        :param:None
        :return: None
        """
        try:
            for filename, tree in self.trees.items():
                packet = dict()
                root = tree.getroot()
                for element in root.iter():
                    for attribute, value in element.attrib.items():
                        packet[element.tag+":"+attribute] = value

                self.packets[filename] = packet
        except Exception as e:
                self.logger.log(logging.WARNING, "XML parse error")
                self.logger.log(logging.ERROR, e)

    def write_to_excel(self):
        """
        Used for write to file obtained information from xml files
        """
        try:
        # Workbook is created 
            wb = Workbook()
            sheet1 = wb.add_sheet('Packets')
            sheet1.write(0, 0, "Packet Path")
            sheet1.write(0, 1, "Packet Name") #ReportPacket:Name
            sheet1.write(0, 2, "Packet Version") #ReportPacket:Version
            sheet1.write(0, 3, "Packet Description") #ReportPacket:Description
            sheet1.write(0, 4, "Log Source ID") #LSource:ID
            sheet1.write(0, 5, "Log Source Name") #LSource:Name
            sheet1.write(0, 6, "Log Source Watch Interval") #LSource:WatchInterval
            sheet1.write(0, 7, "Log Source Path") #LSource:Path
            sheet1.write(0, 8, "Log Source File Name") #LSource:FileName
            sheet1.write(0, 9, "Log Source Rotated File Name") #LSource:RotatedFileName
            sheet1.write(0, 10, "Log Source File Name Static") #LSource:FileNameStatic
            sheet1.write(0, 11, "Log Source Type") #LSource:SourceType
            sheet1.write(0, 12, "Log Source Icon Type") #LSource:LgsIconType
            sheet1.write(0, 13, "Log Source Delet Old File") #LSource:DeleteOldFile
            sheet1.write(0, 14, "Log Source Index") #IndexConfigs:DoIndex
            sheet1.write(0, 15, "Log Source Index Columns") #IndexConfigs:IndexColumns
            sheet1.write(0, 16, "Plugin ID") #PList:ID
            sheet1.write(0, 17, "Plugin Name") #PList:Name
            sheet1.write(0, 18, "Plugin Category Code") #PList:CatCode

            index = 1
            for packet_path, pacjet_values in self.packets.items():
                sheet1.write(index, 0, packet_path) #Packet Path
                for key, value in pacjet_values.items():
                    if key == "ReportPacket:Name":
                        sheet1.write(index, 1, value)
                    elif key == "ReportPacket:Version":
                        sheet1.write(index, 2, value)
                    elif key == "ReportPacket:Description":
                        sheet1.write(index, 3, value)
                    elif key == "LSource:ID":
                        sheet1.write(index, 4, value)
                    elif key == "LSource:Name":
                        sheet1.write(index, 5, value)
                    elif key == "LSource:WatchInterval":
                        sheet1.write(index, 6, value)
                    elif key == "LSource:Path":
                        sheet1.write(index, 7, value)
                    elif key == "LSource:FileName":
                        sheet1.write(index, 8, value)
                    elif key == "LSource:RotatedFileName":
                        sheet1.write(index, 9, value)
                    elif key == "LSource:FileNameStatic":
                        sheet1.write(index, 10, value)
                    elif key == "LSource:SourceType":
                        sheet1.write(index, 11, value)
                    elif key == "LSource:LgsIconType":
                        sheet1.write(index, 12, value)
                    elif key == "LSource:DeleteOldFile":
                        sheet1.write(index, 13, value)
                    elif key == "IndexConfigs:DoIndex":
                        sheet1.write(index, 14, value)
                    elif key == "IndexConfigs:IndexColumns":
                        sheet1.write(index, 15, value)
                    elif key == "PList:ID":
                        sheet1.write(index, 16, value)
                    elif key == "PList:Name":
                        sheet1.write(index, 17, value)
                    elif key == "PList:CatCode":
                        sheet1.write(index, 18, value)
                index += 1
            wb.save(self.output)
        except Exception as e:
                self.logger.log(logging.WARNING, "Excel create error")
                self.logger.log(logging.ERROR, e)


