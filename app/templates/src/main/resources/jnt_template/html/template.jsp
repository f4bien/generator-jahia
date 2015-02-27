<!doctype html>
<%@ include file="../../commons/declarations.jspf" %>
<html class="no-js" lang="${renderContext.mainResourceLocale.language}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${fn:escapeXml(renderContext.mainResource.node.displayableName)}</title>
  <jcr:nodeProperty var="description" node="${renderContext.mainResource.node}" name="jcr:description"
                    inherited="true"/>
  <c:if test="${not empty description}">
    <meta name="description" content="${fn:escapeXml(description.string)}">
  </c:if>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body itemscope itemtype="http://schema.org/WebPage">
<c:set var="mainResourceNode" value="${renderContext.mainResource.node}"/>
<c:if
  test="${jcr:isNodeType(mainResourceNode, 'jnt:page') and not empty mainResourceNode.properties['j:templateNode']}">
  <c:set var="templateNode" value="${mainResourceNode.properties['j:templateNode'].node}"/>
  <c:set var="templateName" value="${templateNode.name}"/>
</c:if>

<div class="bodywrapper ${templateName}">
  <template:area path="pagecontent"/>
</div>

<c:if test="${renderContext.editMode}">
  <template:addResources type="css" resources="edit.css"/>
</c:if>
<template:addResources type="css" resources="app.css"/>
</body>
</html>
<template:theme/>
