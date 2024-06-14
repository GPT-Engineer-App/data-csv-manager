import React, { useState } from 'react';
import { Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton, VStack } from '@chakra-ui/react';
import { FaTrash, FaDownload } from 'react-icons/fa';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const CSVUploader = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setHeaders(result.data[0]);
        setData(result.data.slice(1));
      },
      header: false,
    });
  };

  const handleAddRow = () => {
    setData([...data, Array(headers.length).fill('')]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleCellChange = (rowIndex, columnIndex, value) => {
    const newData = [...data];
    newData[rowIndex][columnIndex] = value;
    setData(newData);
  };

  return (
    <VStack spacing={4} width="100%">
      <Input type="file" accept=".csv" onChange={handleFileUpload} />
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <Td key={columnIndex}>
                  <Input
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                  />
                </Td>
              ))}
              <Td>
                <IconButton
                  aria-label="Remove Row"
                  icon={<FaTrash />}
                  onClick={() => handleRemoveRow(rowIndex)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleAddRow}>Add Row</Button>
      <Button as={CSVLink} data={[headers, ...data]} filename={"edited_data.csv"} icon={<FaDownload />}>
        Download CSV
      </Button>
    </VStack>
  );
};

export default CSVUploader;